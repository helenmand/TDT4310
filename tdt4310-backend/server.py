import flask
from flask_cors import CORS, cross_origin

server = flask.Flask(__name__)
cors = CORS(server)
server.config['CORS_HEADERS'] = 'Content-Type'
server.debug = True

sample_common_words = ["hi", "hei", "hola"]

def make_prediction(input_text):
    return input_text.split()[-1:]

@server.route('/predictions', methods=['GET', 'POST'])
@cross_origin()
def predictions():
    preds = None

    if flask.request.method == 'GET':
        preds = sample_common_words

    elif flask.request.method == 'POST':
        data = flask.request.json.get('data')
        preds = make_prediction(data)

    return flask.jsonify(preds)

server.run()