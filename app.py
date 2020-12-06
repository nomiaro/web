from flask import Flask, request, abort, render_template, jsonify
from iottalkpy import dai

app = Flask(__name__)

@app.route("/", methods=['GET'])
def home():
	return render_template('index.html')
	
@app.route('/api/test')
def test_page():
	f_read = open('data.txt', 'r')
	data = '1'
	while True:
		data = f_read.read()
		if data:
			break
	f_read.close()
	return data

if __name__ == "__main__":
	sa = dai.module_to_sa(dai.load_module('ida.py'))
	sa.start()
	app.run(host='0.0.0.0', port=80)
	sa.terminate()