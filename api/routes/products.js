const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  // DB에 있는 모든상품 가져온다.
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {

  // 1.이미 Repricer에 등록되어있는지 확인한다.
  //   1.1 없으면 DB에 해당 정보를 추가한다
  // 2. 결과 리턴
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
});

router.get('/:productId', (req, res, next) => {
  // DB에 있는 특정상품 가져온다.


    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id자
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
   // DB에 있는 특정상품 업데이트

    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
  // DB에 있는 특정상품 삭제

    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;
