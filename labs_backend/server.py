import flask
from flask_cors import CORS, cross_origin
from lab_runner import LabRunner

server = flask.Flask(__name__)
cors = CORS(server)
server.config['CORS_HEADERS'] = 'Content-Type'
server.debug = True

labs = LabRunner()

sample_common_words = ["hi", "hei", "hola"]

def make_prediction(input_text):
    return input_text.split()[-1:]

@server.route('/predictions', methods=['POST'])
@cross_origin()
def predictions():
    data = flask.request.json.get('data')
    preds = labs.predict(data)
    preds = list(preds.values())
    return flask.jsonify(preds)

server.run()