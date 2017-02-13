module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        monday: {
            type: 'string',
            enum:['half', 'full', 'none'],
            defaultsTo:'None',
            required: false
        },
        tuesday: {
            type: 'string',
            enum:['half', 'full', 'none'],
            defaultsTo:'None',
            required: false
        },
        wednesday: {
            type: 'string',
            enum:['half', 'full', 'none'],
            defaultsTo:'None',
            required: false
        },
        thursday: {
            type: 'string',
            enum:['half', 'full', 'none'],
            defaultsTo:'None',
            required: false
        },
        friday: {
            type: 'string',
            enum:['half', 'full', 'none'],
            defaultsTo:'None',
            required: false
        },
        cost: {
            type: 'string',
            required: false
        },
        startMonth: {
            type: 'string',
            required: false
        },
        endMonth: {
            type: 'string',
            required: false
        }
    }
};