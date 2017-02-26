module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        monday: {
            type: 'string',
            enum: ['checked'],
            defaultsTo: 'none'
        },
        tuesday: {
            type: 'string',
            enum: ['checked'],
            defaultsTo: 'none'
        },
        wednesday: {
            type: 'string',
            enum: ['checked'],
            defaultsTo: 'none'
        },
        thursday: {
            type: 'string',
            enum: ['checked'],
            defaultsTo: 'none'
        },
        friday: {
            type: 'string',
            enum: ['checked'],
            defaultsTo: 'none'
        },
        cost: {
            type: 'float',
            defaultsTo: 0
        },
        startMonth: {
            type: 'string',
            required: true
        },
        endMonth: {
            type: 'string',
            required: true
        }
    }
};