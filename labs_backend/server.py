import flask
from flask_cors import CORS, cross_origin
from lab_runner import LabRunner

server = flask.Flask(__name__)
cors = CORS(server)
server.config['CORS_HEADERS'] = 'Content-Type'
server.debug = True

labs = LabRunner()

@server.route('/')
def health_check():
    return "Server is live"

@server.route('/predictions', methods=['POST'])
@cross_origin()
def predictions():
    data = flask.request.json
    text = data.get('text')
    lab_number = data.get('lab')
    preds = labs.predict(text, lab_number)
    return flask.jsonify(preds)

server.run()
