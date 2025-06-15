// Инсталираме необходимите библиотеки (пакети)
/*
typescript - за да можем да използваме TypeScript вместо чист JavaScript
tsc - ако искаме да компилираме ts скриптове до чист js
tsx - ако искаме да изпълняваме директно ts код 
@types/node - пакет с информация за типовете, които поддържа Node.js, за да ги ползваме в TypeScript
@types/express - пакет с информация за типовете, които поддържа пакета Express
express - библиотека, която позволява изграждането на HTTP сървър в Node.js
body-parser - middleware пакет, който позволява на Express да извлича съдържанието на тялото на HTTP заявки
cors - middleware пакет, който позволява на Express да отговаря на fetch заявки от външни източници
*/

// Импортираме необходимите пакети
// Вариант с require (остарял)
// const pakcage = require("package")
// Вариант с import
// import package from "package"
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Може да има и модел на данните (интерфейси и абстрактни класове), които структурират обектите или се използват като типове
import { Smartphone } from "./dataObject.model";

//създаваме обект, който ще представлява основния процес на сървъра
const app = express()

//казваме на сървъра да използва желания middleware 
// middleware - малък пакет от код, който обработва информацията след като тя е получена, но преди да я достъпим ние в кода
app.use(cors())
app.use(bodyParser.json())
const urlEncodedParser = bodyParser.urlencoded()

// Избираме мрежови порт, на който да слуша сървъра (най-често 3000) и го запазваме в константа
const port = 3000;

// Дефинираме адресите, които ще осбслужва сървъра и с какви методи
// Позволено е да се ползват различни методи през един и същи адрес, ако обработват един и същи обект
// Всеки адрес+метод (нар. endpoint) изисква callback, който има два параметъра - req - Request и res - Response
// req съдържа информацията за получената заявка, res съдържа информация за отговора, който сървърът ще изпрати
// на края на логиката във всеки callback, сървърът трябва да изпрати статус или друго съдържание в отговора
// често използвани статуси: 200 - OK, 201 - Created, 401 - Unauthorized, 403 - Forbidden, 404 - Not found, 500 - Server error
// превръщане на json низ в обект - JSON.parse(someString); превръщане на обект в низ - JSON.stringify(someObject)
const phones:Smartphone[] = []

app.get("/smartphones", urlEncodedParser,(req,res)=>{
    //some-logic
    console.log(req.query)

    const {androidName:androidNameQs, batteryCapacity:batteryCapacityQs, manufacturer:manufacturerQs} = req.query;
    const batteryCapacity = Number.parseInt(batteryCapacityQs as string);
    const androidName = androidNameQs as string;
    const manufacturer = manufacturerQs as string;
    const phone :Smartphone= {androidName, batteryCapacity, manufacturer}
    res.json(JSON.stringify(phones)) // или друг статус или res.json(something) или res.text("something")

})
app.post("/smartphones", urlEncodedParser, (req,res)=>{
    //some-logic
    const {androidName:androidNameQs, batteryCapacity:batteryCapacityQs, manufacturer:manufacturerQs} = req.body;
    const batteryCapacity = Number.parseInt(batteryCapacityQs as string);
    const androidName = androidNameQs as string;
    const manufacturer = manufacturerQs as string;
    const phone :Smartphone= {androidName, batteryCapacity, manufacturer}

    phones.push(phone)
    console.log(phone)
    res.sendStatus(201); // или друг статус или res.json(something) или res.text("something")
})


// След дефиниция на всички адреси и методи за обслужване, стартираме сървъра на избрания порт и му подаваме код, който да изпълни, когато стартирането е успешно
app.listen(port,()=> console.log("Listening on port "+port))
