const connection = require('../database/connction');

module.exports = {
    async index(request, response){
        const ong_id =  request.headers.authorization;
        const incident = await connection('incitents')
                .where('ong_id', ong_id)
                .select('*');
        return response.json(incident);
        }
};