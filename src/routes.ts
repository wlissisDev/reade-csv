import { Router } from 'express'
import { Readable } from 'stream'

//ler o conteudo do Readable que é o csv
import readLine from 'readline'

import multer from "multer";
import { client } from './database/cliente';

const multerConfig = multer();

export const router = Router()

interface DataType {
    age: number
    sex: string
    bmi: number
    children: number
    smoker: string
    region: string
    expenses: number
}

router.post("/data", multerConfig.single("file"), async (req, res) => {

    const buffer = req.file?.buffer;


    //leitura do arquivo sem precisar de path
    const redableFile = new Readable();
    redableFile.push(buffer);
    redableFile.push(null);


    //lendo o readableFile
    const dataLine = readLine.createInterface({
        input: redableFile
    })

    const datas: DataType[] = [];

    for await (let line of dataLine) {
        const dataLine = line.split(",");
        datas.push({
            age: Number(dataLine[0]),
            sex: dataLine[1],
            bmi: Number(dataLine[2]),
            children: Number(dataLine[3]),
            smoker: dataLine[4],
            region: dataLine[5],
            expenses: Number(dataLine[6])
        })

        // console.log(dataLine)
        for await (let {
            age,
            bmi,
            children,
            expenses,
            region,
            sex,
            smoker } of datas) {

            await client.data.create({
                data: {
                    age,
                    sex,
                    bmi,
                    children,
                    smoker,
                    region,
                    expenses,
                }
            });
        }
    }

    return res.send("acabou")

})

