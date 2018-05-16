const path = require('path');
const childProcess = require('child_process');

const e2e_server_process = start_e2e_server();
run_e2e_tests();

/**
 * Start the application.
 * Calling 'ng serve' through node is necessary in order to maintain a handle to the process that can be killed later.
 */
function start_e2e_server() {
  console.log('start_e2e_server');
  return childProcess
    .spawn('node', ['./node_modules/@angular/cli/bin/ng', 'serve'], {
      env: process.env,
      detached: true,
      shell: false,
      stdio: 'ignore'
    })
    .on('error', error => {
      shutdown_e2e_server();
    })
    .on('close', close => {
      shutdown_e2e_server();
    });
}

/**
 * Run the functional end-to-end tests.
 * Refer to functional-tests/readme.md for more information.
 */
function run_e2e_tests() {
  console.log('run_e2e_tests');
  childProcess
    .spawn(
      process.platform === 'win32' ? 'gradlew.bat' : './gradlew',
      ['chromeHeadlessTest'],
      {
        env: process.env,
        cwd: path.join(process.cwd(), 'functional-tests'),
        stdio: 'inherit'
      }
    )
    .on('exit', exit => {
      shutdown_e2e_server();
    });
}

/**
 * Stop the application.
 */
function shutdown_e2e_server() {
  if (e2e_server_process) {
    console.log('shutdown_e2e_server');
    e2e_server_process.kill('SIGINT');
  }
}
