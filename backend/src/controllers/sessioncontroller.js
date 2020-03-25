const connection = require('../database/connction');

module.exports = {
    async create(request, response) {
        const { id } = request.body;
        const ong = await connection('ongs')
                .where('id', id)
                .select('name')
                .first();
        if (!ong){
            return response.status(400).json({error: "ONG nao pretence a este ID" });
        }
        
        return response.json(ong);
    }

};