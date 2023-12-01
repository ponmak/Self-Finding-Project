from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify
import os
import openai
import easyocr
from pdf2image import convert_from_path
from dotenv import load_dotenv, find_dotenv
import pathlib

load_dotenv(find_dotenv())

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/_swk/py', methods=['GET'])
def get_message():
    return "Hello, World!"

def process_file_content(file):
    filename = secure_filename("sop" + pathlib.Path(file.filename).suffix)
    full_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(full_path)
    
    file_path = full_path
    file_ext = pathlib.Path(filename).suffix
    print(filename, file_ext, full_path)
    
    contents = ''
    try: 
        if file_ext == '.pdf':
            images = convert_from_path(full_path)

            reader = easyocr.Reader(['th', 'en'])  # this needs to run only once to load the model into memory

            for i, image in enumerate(images):
                # Save pages as images in the pdf
                image_path = f'sop{i}.jpg'
                image.save(image_path, 'JPEG')

                # Read text from the saved image
                result = reader.readtext(image_path) #waiting for 1-2 minutes

                # Append the results to contents
                for detection in result:
                    text = detection[1]
                    contents += ' ' + text
        elif file_ext == '.txt':
            with open(f"{full_path}",encoding='utf8') as f:
                contents = f.read()
    except Exception as e:
        print("please check file type")

    chat_1= openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role":"user","content": f"{contents} จาก SOP ข้างต้นคิดว่านักเรียนคนนี้ควรเรียนคณะอะไรมีที่ไหนเปิดสอนบ้าง จัดอันดับมาสัก 3 คณะ 5 มหาวิทยาลัยภายในประเทศไทย โดยตอบในลักษณะคล้ายๆดั่งนี้"+"""การตัดสินใจเรียนคณะวิศวกรรมคอมพิวเตอร์ควรพิจารณาจากความสนใจและความถนัดของตัวเองในด้านเทคโนโลยีและวิศวกรรมคอมพิวเตอร์ นอกจากนั้นยังสำคัญมากที่จะพิจารณาสถาบันที่มีการเปิดสอนสาขาวิศวกรรมคอมพิวเตอร์อย่างพอเหมาะสม

    ต่อไปนี้คือคำแนะนำสำหรับมหาวิทยาลัยที่เปิดสอนสาขาวิศวกรรมคอมพิวเตอร์ที่คุณสามารถพิจารณาได้:

    1. มหาวิทยาลัยเกษตรศาสตร์ (Kasetsart University) - สถาบันการศึกษาชั้นนำที่เป็นที่ยอมรับในด้านวิศวกรรมและเทคโนโลยี วิทยาเขตบางเขนและวิทยาเขตกำแพงแสนของมหาวิทยาลัยเกษตรศาสตร์มีคณะวิศวกรรมศาสตร์ ซึ่งเปิดสอนสาขาวิศวกรรมคอมพิวเตอร์ที่มีคุณภาพสูง สามารถศึกษาเพิ่มเติมได้ที่เว็บไซต์ของมหาวิทยาลัย

    2. มหาวิทยาลัยเซนต์ปีเตอร์สเบิร์ก (Saint Petersburg University) - มหาวิทยาลัยชั้นนำในระดับโลกที่มีคณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์ที่มีความเชี่ยวชาญในการสร้างและพัฒนาซอฟต์แวร์

    3. มหาวิทยาลัยชื่อดังที่เปิดสอนสาขาวิศวกรรมคอมพิวเตอร์มีหลายแห่งเช่น จุฬาลงกรณ์มหาวิทยาลัย มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ และมหาวิทยาลัยเทคโนโลยีสุรนารี ควรศึกษาข้อมูลและความเหมาะสมตามความต้องการและความสนใจของตัวเอง

    อย่างไรก็ตาม คุณควรทำการวิจัยเพิ่มเติมเกี่ยวกับสถาบันการศึกษาและสถานะวิชาการของมหาวิทยาลัยเหล่านี้เพื่อตัดสินใจที่ดีที่สุดสำหรับความต้องการและเป้าหมายของคุณในการศึกษาวิศวกรรมคอมพิวเตอร์"""},
        ]
    )['choices'][0]['message']['content']
    print(chat_1)

    chat_2 = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role":"user","content": f"{chat_1} จากคำตอบช่วยแนะนำแผนการเรียน (study plan) ของแต่ละคณะโดยแสดงเป็นข้อๆ โดยตอบในลักษณะคล้ายๆดั่งนี้ "+"""- คณะที่สนับสนุนและให้ความสำคัญกับการพัฒนาทักษะในการเขียนโปรแกรมและการวิเคราะห์ข้อมูล เพื่อให้คุณมีพื้นฐานที่แข็งแกร่งในการทำงานในวงการไอที
    - คณะที่มีระบบการสอนที่ทันสมัยและมีโอกาสในการฝึกงานหรือศึกษาต่อในต่างประเทศ เพื่อเพิ่มคุณภาพและขยายโอกาสในอนาคต
    - คณะที่มีแนวโน้มในการสร้างสรรค์และนวัตกรรมใหม่ในด้านวิศวกรรมคอมพิวเตอร์ เช่น การพัฒนาเทคโนโลยีใหม่หรือการนำเทคโนโลยีที่มีอยู่มาใช้ให้เกิดประโยชน์มากขึ้นในสังคม

    อย่างไรก็ตาม อย่าลืมว่าคุณต้องรู้จักในเรื่องนักศึกษาและคุณผลบัพท์หลังเรียนจากคณะนั้น คุณสามารถสอบถามจากศิษย์เก่าหรือที่ปรึกษาการศึกษาเพื่อทราบข้อมูลเพิ่มเติมเกี่ยวกับประสบการณ์การเรียนรู้และโอกาสที่มีให้กับนักศึกษาในคณะนั้นๆ"""},
        ]
    )['choices'][0]['message']['content']
    print(chat_2)
    return chat_1, chat_2

@app.route('/api/_swk/py/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    print(file)
    if file:
        chat_1, chat_2 = process_file_content(file)
        return jsonify(chat_1=chat_1, chat_2=chat_2)
    return jsonify(error="No file uploaded"), 400

if __name__ == '__main__':
    app.run(host='localhost', port=9999)