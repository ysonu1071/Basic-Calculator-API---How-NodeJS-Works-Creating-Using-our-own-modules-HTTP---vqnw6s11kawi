const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here


function underFlow(parameter){
    if (parameter < -1000000){
        return true;
    }
    return false;
}
function overFlow(parameter){
    if (parameter > 1000000){
        return true;
    }
    return false;
}

function isString(num1, num2){
    if(typeof(num1) == 'string' || typeof(num2) == 'string') {
        return true
    }

    return false;
}


function validateData(num1, num2){
    if (isString(num1,num2)){
        return {
            status: "error",
            message: "Invalid data types"
        }
    }else if(overFlow(num1) || overFlow(num2)) {
        return {
            status:"error",
            message: "Overflow"
        }
    }else if(underFlow(num1) || underFlow(num2)) {
        return {
            status: "error",
            message: "Underflow"
        }
    }else{
        return null;
    }
}

app.get('/', (req, res)=> {
    res.send("Hello world!")
})

app.post("/add", (req, res) => {
    const {num1, num2} = req.body;

    const response = {
        status:"success",
        message: "the sum of given two numbers",
        sum: num1+num2
    }

    let validatedData = validateData(num1,num2);
    if(validatedData){
        res.send(validatedData)
    }else{
        let validateResult = validateData(response.result)
        if (validateResult){
            res.send(validateResult)
        }else{
            res.send(response);
        }
    }
})

app.post("/sub", (req, res) => {
    const {num1, num2} = req.body;

    const response = {
        status:"success",
        message: "the difference of given two numbers",
        difference: num1-num2
    }

    let validatedData = validateData(num1,num2);
    if(validatedData){
        res.send(validatedData)
    }else{
        let validateResult = validateData(response.result)
        if (validateResult){
            res.send(validateResult)
        }else{
            res.send(response);
        }
    }
})

app.post("/multiply", (req, res) => {
    const {num1, num2} = req.body;

    const response = {
        status:"success",
        message: "The product of given numbers",
        result: num1*num2
    }

    let validatedData = validateData(num1,num2);
    if(validatedData){
        res.send(validatedData)
    }else{
        let validateResult = validateData(response.result)
        if (validateResult){
            res.send(validateResult)
        }else{
            res.send(response);
        }
    }
})

app.post("/divide", (req, res) => {
    const {num1, num2} = req.body;
    if (num2 == 0) {
        res.send({
            status:"error",
            message:'Cannot divide by zero'
        })
    }else{
        const response = {
            status:"success",
            message: "The division of given numbers",
            result: num1/num2
        }

        let validatedData = validateData(num1,num2);
        if(validatedData){
            res.send(validatedData)
        }else{
            let validateResult = validateData(response.result)
            if (validateResult){
                res.send(validateResult)
            }else{
                res.send(response);
            }
        }
        }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;