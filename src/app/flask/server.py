from flask import Flask, request, make_response, send_file, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
from docx import Document
import pandas
import xlrd

def make_doc(education_level="Бакалавриат", profile="Информационные системы и технологии", discipline="Информатика", education_start_year="2021", programm_variant="5"):

    course = "Информационные системы и технологии"
    course_discipline = "Информатика"
    course_code = "09.03.02"
    graduate_department = "ГИС"
    developer_department = "ГИС"
   
    xls_file = pandas.ExcelFile('IST4.xls')
    df = pandas.read_excel(xls_file, 'План')
    doc_file = Document('test_doc.docx')

###   Рабочая программа дисциплини
    search_line = 'РАБОЧАЯ ПРОГРАММА ДИСЦИПЛИНЫ'
    paragraph_index = 0
    for paragraph in doc_file.paragraphs:
        if paragraph_index == 1:
            paragraph.text += '   ' + "РПД1"
            break
        if search_line in paragraph.text:
            paragraph_index = 1

###   Рабочая программа дисциплини 2
    search_line = 'РАБОЧАЯ ПРОГРАММА ДИСЦИПЛИНЫ'
    paragraph_index = 0
    for paragraph in doc_file.paragraphs:
        if paragraph_index == 3:
            paragraph.text += '   ' + "РПД2"
            break
        if paragraph_index == 2:
            paragraph_index += 1
        if search_line in paragraph.text:
            paragraph_index += 1

###   База

    search_line = 'Направление подготовки'
    for paragraph in doc_file.paragraphs:
        if search_line in paragraph.text:
            paragraph.text += '   ' + course_code + ' ' + course
            break

    search_line = 'Направленность: '
    for paragraph in doc_file.paragraphs:
        if search_line in paragraph.text:
            paragraph.text += '   ' + "НАПРАВЛЕННОСТЬ"
            break

    search_line = 'Год начала подготовки '
    for paragraph in doc_file.paragraphs:
        if search_line in paragraph.text:
            paragraph.text += '   ' + education_start_year
            break

    search_line = 'Выпускающая кафедра'
    for paragraph in doc_file.paragraphs:
        if search_line in paragraph.text:
            paragraph.text += '   ' + graduate_department
            break

    search_line = 'Кафедра-разработчик'
    for paragraph in doc_file.paragraphs:
        if search_line in paragraph.text:
            paragraph.text += '   ' + developer_department
            break


###   Промежуточная аттестация
    courses_index = [4,8,13,17,22,26,31,35]
    dr = pandas.read_excel(xls_file, 'Диаграмма курсов')
    attestation = []

    for i in range(8):
        for j in range(350):
            volume = str(dr.iat[j,courses_index[i]])
            if discipline in volume:
                #if ('За' in volume) and ('ЗаО' not in volume):
                    #attestation.append('Сем ' + str(i+1) + ' - За')
                    #break
                #if 'ЗаО' in volume:
                    #attestation.append('Сем ' + str(i+1) + ' - ЗаО')
                    #pring(volume)
                if 'За' in volume and 'ЗаО' not in volume:
                    attestation.append('Сем ' + str(i+1) + ' - За')
                    break
                if 'ЗаО' in volume:
                    attestation.append('Сем ' + str(i+1) + ' - ЗаО')
                    break
                if 'Экз' in volume:
                    attestation.append('Сем ' + str(i+1) + ' - Экз')
                    break

    search_line = 'Промежуточная аттестация'
    attestation_string = ''
    for paragraph in doc_file.paragraphs:
        if search_line in paragraph.text:
            for i in attestation:
                attestation_string += '   ' + i
            paragraph.text += '   ' + attestation_string
            break



###   Объем дисциплины
    for i in range(df.shape[0]):
        if df.iat[i,3] == discipline:
            discipline_volume_amount = df.iat[i,14]

    search_line = 'Объем дисциплины '
    #new_line = f"jksjkdjf {volume}"
    for paragraph in doc_file.paragraphs:
        if search_line in paragraph.text:
            paragraph.text += discipline_volume_amount
    
    doc_file.save('C:/Users/Sofya/IdeaProjects/Thesis/src/assets/test.docx')
    
    

###   Конец функции обработки


app = Flask(__name__)
CORS(app)
app.config["DOC"]="/home/cyger/sonya_diplom/fed_backend_flask/"

@app.route("/",methods = ['POST', 'GET'])
def hello():

    print("data")
    print(request.data)

    print("full json")
    request_json = request.get_json(force=True)
    print(request_json)

    education_level = request_json['urovenObraz']
    print(education_level)

    course = request_json['profil']
    print(course)

    discipline = request_json['disciplina']
    print(discipline)

    education_start_year = request_json['date']
    print(education_start_year)

    programm_variant = request_json['mestoVStructure']
    print(programm_variant)

    print("Start making doc")
    make_doc(education_level, course, discipline, education_start_year, programm_variant)
    print("Finish making doc")

    return jsonify(response_status='OK')


    #return send_file("C:\Users\Sofya\IdeaProjects\Thesis\src\app\files\test_doc.docx", as_attachment=True)

if __name__ == "__main__":


    app.run(host='0.0.0.0', port=8080)
'''
    education_level = 'Магистратура'
    print(education_level)

    course = 'Информационная поддержка жизненного цикла изделий и инфраструктуры'
    print(course)

    discipline = 'Русский язык и культура речи'
    print(discipline)

    education_start_year = '2021'
    print(education_start_year)

    programm_variant = '5'
    print(programm_variant)

    make_doc(education_level, course, discipline, education_start_year, programm_variant)

'''
