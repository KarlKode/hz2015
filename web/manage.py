from flask.ext.migrate import MigrateCommand
from flask.ext.script import Manager, Shell
from flask.ext.script.commands import Clean, ShowUrls
from web_api import create_app, db

app = create_app()

manager = Manager(app)

manager.add_command('shell', Shell(make_context=lambda: {'app': app, 'db': db}))
manager.add_command('clean', Clean())
manager.add_command('urls', ShowUrls())
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
