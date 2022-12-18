import flask
from flask_cors import CORS, cross_origin
from lab_runner import LabRunner

server = flask.Flask(__name__)
cors = CORS(server)
server.config['CORS_HEADERS'] = 'Content-Type'
server.debug = True

labs = LabRunner()

def make_prediction(input_text):
    return input_text.split()[-1:]

@server.route('/predictions', methods=['GET', 'POST'])
@cross_origin()
def predictions():
    if flask.request.method == 'GET':
        return flask.jsonify({'info': 'Server is live'})

    json = flask.request.json
    data = json.get('data')
    lab_number = json.get('lab')
    preds = labs.predict(data, lab_number)
    return flask.jsonify(preds)

server.run()