const express = require("express");
const req = require("express/lib/request");
const articles = require("../schemas/articles");
const Article = require("../schemas/articles")

const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is route page!!!");
})

// 게시글 목록 전체 조회
router.get("/articles", async (req, res) => {
    const { category } = req.query;
    const articles = await Article.find({ category });
    res.json({
        articles,
    });
});

//게시글 조회
router.get("/articles/:postId", async (req, res) => {
    const { postId } = req.params;
    console.log(postId)

    if(isNaN(Number(postId))){
        return res.status(400).json({ success:false, errorMessage: "포스트번호가 숫자가 아닙니다."});
    }

    const [articles] = await Article.find({ postId: Number(postId) });

    res.json({
        articles,
    });
});
//게시글 생성
router.post("/articles", async (req, res) => {
    const { postId, subject, author, password, content, date } = req.body;
    await Article.create({ subject, author, content, password, date, });
    res.json({ result : "success" });
});

//게시글 수정
router.put("/articles/:postId/modify", async (req, res) => {
    const { postId } = req.params;
    const { subject, content, author, password } = req.body;
    console.log(req.body);
    console.log(subject);
    const existArticles = await Article.findOne({ postId: Number(postId) });
    if (existArticles.password != password) {
        return res.send({ success:false, 'msg': "비밀번호가 일치하지 않습니다"});
    }

    if (existArticles.password == password) {
        await Article.updateOne({ postId: Number(postId) }, { $set: { subject, content, author }})
    }
    
    res.send({ result: "success", 'msg': '수정이 완료되었습니다!' });
});

//게시글 삭제
router.delete("/articles/:postId", async (req, res) => {
    const { postId } = req.params;
    const { password } = req.body;
    console.log(password)
    const existArticles = await Article.findOne({ postId: Number(postId) });
    if (existArticles.password != password) {
        return res.send({ success:false, 'msg': "비밀번호가 일치하지 않습니다"});
    }
    if (existArticles.password == password) {
        await Article.deleteOne({ postId: Number(postId)});
    }

    res.send({ result: "success", 'msg': '삭제 완료!😛' })
});


module.exports = router;