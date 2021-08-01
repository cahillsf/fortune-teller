(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["ddAppId"] = "${DD_APP_ID}";
  window["env"]["ddClientToken"] = "${DD_CLIENT_TOKEN}";
})(this);