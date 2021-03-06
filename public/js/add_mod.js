var add_mod_data = { result_text: null, add_mod_username: '' };
var add_mod_vm = new Vue({
  el: '#add_mod',
  data: add_mod_data,
  methods: {
    add_mod: function (event) {
      var add_mod_body = new URLSearchParams();
      add_mod_body.set('username', add_mod_data.add_mod_username);
      add_mod_body.set('is_mod', 1);
      fetch('/api/users', {
        method: 'POST',
        body: add_mod_body,
        credentials: 'include'
      }).then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status + ' ' + response.statusText);
        }
      }).then(function(data) {
        if (data.success) {
          var success_text = 'Created moderator account ' + data.username + ' with reset code ' + data.reset_code;
          srq_common.set_result_text(add_mod_data, success_text, -1);
        } else {
          throw new Error(data.error || 'Failed to create moderator account');
        }
      }).catch(function(error) {
        srq_common.set_result_text(add_mod_data, error.toString());
      });
    }
  }
});
