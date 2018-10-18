const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require("../models/product");

// 스토어팜 상품 가져오기
router.get('/',(req,res,next)=>{
  // 1.스토어팜에서 상품정보를 크롤링한다.
  // 2.가격비교페이지에서 상품정보를 크롤링한다.
  // 3.이미 Repricer에 등록되어있는지 확인한다.
  //   3.1 있으면 DB에 해당 정보를 업데이트한다.
  //   3.2 없으면 DB에 해당 정보를 추가한다
  // 4. 모든 상품정보를 리턴
  res.status(200).json({
    message: '스토어팜에서 모든 상품 가져오기'
  });
});

// 스토어팜 특정상품 가져오기
router.get('/:orderId', (req, res, next) => {
  // 1.DB에서 해당 정보를 가져온다.
    res.status(200).json({
        message: '스토어팜에서 특정 상품 가져오기',
        orderId: req.params.orderId
    });
});

module.exports = router;
