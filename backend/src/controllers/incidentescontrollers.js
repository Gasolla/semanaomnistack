const connection = require('../database/connction');

module.exports = {
    async index(request, response){
        const ong_id =  request.headers.authorization;
        const [count] = await connection('incitents').where('incitents.ong_id', ong_id).count();
        const {page = 1} = request.query;
        const incidents = await connection('incitents')
                        .join('ongs', 'ongs.id', '=', 'incitents.ong_id')
                        .where('incitents.ong_id', ong_id)
                        .limit(5)
                        .offset((page-1)*5)
                        .select(['incitents.*', 
                                 'ongs.name', 
                                 'ongs.email', 
                                 'ongs.whatsapp', 
                                 'ongs.city', 
                                 'ongs.uf']);
        response.header('X-Total-count', count['count(*)']);
        return response.json(incidents);
        },
    async create(request, response) {
        const {title, descripition, value } = request.body;
        const ong_id =  request.headers.authorization;
        const [id] = await connection('incitents').insert({
            title, 
            descripition, 
            value, 
            ong_id,
        })
    
        return response.json({id});
    }, 
    async delete(request, response) {
        const { id } = request.params;
        const ong_id =  request.headers.authorization;
        const incident = await connection('incitents')
                .where('id', id)
                .select('ong_id')
                .first();
        if (incident.ong_id !== ong_id){
            return response.status(401).json({error: "operação inavalida para o usuario." });
        }
        await connection('incitents').where('id', id).delete();

        return response.status(204).send();
    }
};