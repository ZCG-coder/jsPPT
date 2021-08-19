from http.server import HTTPServer
from http.server import SimpleHTTPRequestHandler

httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)

httpd.serve_forever()
