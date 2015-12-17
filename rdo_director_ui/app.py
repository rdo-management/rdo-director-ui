from __future__ import unicode_literals

import json
import os
import sys

from flask import Flask, render_template, send_from_directory
from oslo_config import cfg, types
from oslo_log import log


LOG = log.getLogger(__name__)

PortType = types.Integer(1, 65535)

DIST_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                         '..', 'dist')

# App options
cfg.CONF.register_group(cfg.OptGroup(name='app',
                                     title='UI app options'))
cfg.CONF.register_opts([cfg.StrOpt('bind_host',
                                   default='192.0.2.1',
                                   help='App host address'),
                        cfg.Opt('bind_port',
                                default=8888,
                                type=PortType,
                                help='App port'),
                        cfg.BoolOpt('debug',
                                    default=False)],
                       group='app')

# TripleO API options
cfg.CONF.register_group(cfg.OptGroup(name='tripleo_api',
                                     title='TripleO API options'))
cfg.CONF.register_opts([cfg.StrOpt('bind_host',
                                   default='192.0.2.1',
                                   help='TripleO host address'),
                        cfg.Opt('bind_port',
                                default=8585,
                                type=PortType,
                                help='TripleO port')],
                       group='tripleo_api')

# Keystone API options
cfg.CONF.register_group(cfg.OptGroup(name='keystone_api',
                                     title='Keystone API options'))
cfg.CONF.register_opts([cfg.StrOpt('bind_host',
                                   default='192.0.2.1',
                                   help='Keystone host address'),
                        cfg.Opt('bind_port',
                                default=5000,
                                type=PortType,
                                help='Keystone port')],
                       group='keystone_api')

# Validation API options
cfg.CONF.register_group(cfg.OptGroup(name='validation_api',
                                     title='Validation API options'))
cfg.CONF.register_opts([cfg.StrOpt('bind_host',
                                   default='192.0.2.1',
                                   help='Validation API host address'),
                        cfg.Opt('bind_port',
                                default=5001,
                                type=PortType,
                                help='Validation API port')],
                       group='validation_api')

app = Flask(__name__, template_folder=DIST_PATH)


@app.route('/', methods=['GET'], defaults={'path': ''})
@app.route('/<path:path>', methods=['GET'])
def index(path):
    return render_template('index.html')


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory(DIST_PATH + '/js', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory(DIST_PATH + '/css', path)


@app.route('/img/<path:path>')
def send_img(path):
    return send_from_directory(DIST_PATH + '/img', path)


@app.route('/fonts/<path:path>')
def send_fonts(path):
    return send_from_directory(DIST_PATH + '/fonts', path)

def main(args=sys.argv[1:]):
    cfg.CONF(args)
    app.run(port=cfg.CONF.app.bind_port, debug=cfg.CONF.app.debug)


if __name__ == '__main__':
    main()
