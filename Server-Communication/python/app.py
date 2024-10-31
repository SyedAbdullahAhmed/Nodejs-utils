from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# API to receive data from Node.js server
@app.route('/api/from-node', methods=['POST'])
def from_node():
    data = request.get_json()
    print('Received data from Node.js server:', data)
    return jsonify({'message': 'Data received on Python server from Node.js', 'data': data})

# API to send data to Node.js server
@app.route('/api/send-to-node', methods=['GET'])
def send_to_node():
    try:
        response = requests.post('http://localhost:3000/api/from-python', json={
            'message': 'Hello from Python server!',
            'timestamp': '2024-10-14',
        })
        return jsonify({'message': 'Data sent to Node.js server', 'response': response.json()})
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# Start the Flask server
if __name__ == '__main__':
    app.run(port=5000)
