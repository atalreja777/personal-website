"""Local preview server that never lets the browser cache files,
so every refresh shows your latest edits.  Run: python3 serve.py"""
import http.server, socketserver

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

# threaded, so a long video download never blocks the page's other files
socketserver.ThreadingTCPServer.allow_reuse_address = True
socketserver.ThreadingTCPServer.daemon_threads = True
with socketserver.ThreadingTCPServer(("", 8765), NoCache) as httpd:
    print("Serving on http://localhost:8765")
    httpd.serve_forever()
