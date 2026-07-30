function timestamp() {
    return new Date().toISOString();
}

function step(message) {
    console.log(`[${timestamp()}] STEP: ${message}`);
}

function info(message) {
    console.log(`[${timestamp()}] INFO: ${message}`);
}

function error(message) {
    console.error(`[${timestamp()}] ERROR: ${message}`);
}

module.exports = { step, info, error };
