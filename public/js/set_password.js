var set_password_data = {
  result_text: null,
  set_password_username: '',
  set_password_code: '',
  set_password_current: '',
  set_password_password: '',
  set_password_verify: ''
};
var set_password_vm = new Vue({
  el: '#set_password',
  data: set_password_data,
  methods: {
    set_password: function (event) {
      var set_password_body = new URLSearchParams();
      set_password_body.set('username', set_password_data.set_password_username);
      set_password_body.set('code', set_password_data.set_password_code);
      set_password_body.set('current', set_password_data.set_password_current);
      set_password_body.set('password', set_password_data.set_password_password);
      set_password_body.set('verify', set_password_data.set_password_verify);
      fetch('/api/set_password', {
        method: 'POST',
        body: set_password_body,
        credentials: 'include'
      }).then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status + ' ' + response.statusText);
        }
      }).then(function(data) {
        if (data.success) {
          srq_common.set_result_text(set_password_data, 'Password successfully changed');
        } else {
          throw new Error(data.error || 'Failed to set password');
        }
      }).catch(function(error) {
        srq_common.set_result_text(set_password_data, error.toString());
      });
    }
  }
});
