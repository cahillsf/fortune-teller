(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["ddAppId"] = "${DD_FT_APP_ID}";
  window["env"]["ddClientToken"] = "${DD_FT_CLIENT_TOKEN}";
})(this);