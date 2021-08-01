#!/bin/bash
node_modules/.bin/envsub ./src/assets/env.template.js ./src/assets/env.js && node_modules/.bin/ng serve --host 0.0.0.0