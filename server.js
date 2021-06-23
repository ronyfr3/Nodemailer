const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require("nodemailer");
// const nmgun=require('nodemailer-mailgun-transport')

const app = express()
const PORT = 5000 || process.env.PORT

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/api/form',(req, res) => {
    console.log(req.body)
    const tp = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rakib.devatmern@gmail.com',
            pass:'hello_world123456'
        }
    })

    // mailgun config
    // const auth = {
    //     auth: {
    //         api_key: '7ac74f61daaa18559b0a1d69e0458f2f-1f1bd6a9-b38814c0',
    //         doamin:'sandboxd95bd62f7825401ab03ee5572db0db69.mailgun.org'
    //     }
    // }
    // const transporter = nodemailer.createTransport(nmgun(auth))

    const mailOptions = {
        //req.body.email
        from: req.body.email,
        to: 'rakib.devatmern@gmail.com',
        subject: `Message from ${req.body.name}`,
        text: req.body.msg
    }
    //email sent
    tp.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            res.send('error occured!')
        } else {
            console.log('Email send', info.response)
            res.send('success')
        }
    })
})

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))