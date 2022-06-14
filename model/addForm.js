const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AddFormSchema = new Schema({
    id: {type: Number},
    header: {type: String},
    tags: [{
       id: {type: Number},tag: {type: String}
    }],
    details: [{
        id: {type: Number},
        header: {type: String},
        text: {type: String}
    }]
})

AddFormSchema.statics.addForm = function (id) {
    const AddForm = mongoose.model('form')

    return AddForm.findById(id)
        .then(res => {
            res.done = true
            return Promise.all([res.save()])
                .then(([res]) => res)
        })
}



mongoose.model('form', AddFormSchema)
