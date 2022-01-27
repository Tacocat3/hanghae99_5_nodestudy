const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose)

const articleSchema = new mongoose.Schema({

    subject: {  // 제목
        type: String,
        require: true,
    },
    author: { // 글쓴이
        type: String,
        require: true,
    },
    password: { //비밀번호
        type: Number,
        require: true,
    },
    content: { //글 내용
        type: String,
        require: true,
    },

    category: { //카테고리
        type: String,
    },

    date: { // 등록일
        type: String,
        require: true,
    }
});

articleSchema.plugin(AutoIncrement, {inc_field: 'postId'})

module.exports = mongoose.model("Article", articleSchema);