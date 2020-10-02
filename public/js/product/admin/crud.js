+function ($, window, document) {

	var Plugin = {

		SELECTOR_EDIT: 'tr.js_edit',
		SELECTOR_EDIT_COLLAPSE: '.js_edit .collapse',
		SELECTOR_EDIT_BUTTON_SAVE: 'tr.js_edit button.js_save',
		SELECTOR_BUTTON_DELETE: '.js_delete',

		init: function() {
			$(document).on('click', this.SELECTOR_BUTTON_DELETE, this.deleteProduct.bindToContext(this));

			$(this.SELECTOR_EDIT).hide();
			$(this.SELECTOR_EDIT_COLLAPSE).on('show.bs.collapse', function (e) { $(e.target).closest(this.SELECTOR_EDIT).show(); }.bindToContext(this));
			$(this.SELECTOR_EDIT_COLLAPSE).on('hidden.bs.collapse', function (e) { $(e.target).closest(this.SELECTOR_EDIT).hide(); }.bindToContext(this));
			$(document).on('click', this.SELECTOR_EDIT_BUTTON_SAVE, this.save.bindToContext(this));
		},

		save: function(event) {
			event.preventDefault();
			var $button = $(event.target);
			var $form = $button.closest('form');
			$button.prop('disabled', true).css({ opacity: 0.25 });
			$.ajax({
				url: $form.attr('action'),
				method: 'post',
				dataType: 'json',
				data: $form.serialize(),
				success: function (data) {
					// Product is created or updated.
					NotifyJsAlert.successWithTimeout('saved', 2, $button, 'right middle');
				}.bindToContext(this),
				error: function (jqXHR, textStatus, errorThrown) {
					// Show error alert.
					var message = "Ошибка: {0} {1}".format(jqXHR.status, errorThrown);
					NotifyJsAlert.errorWithTimeout(message, 5, $button, 'right middle');
				}.bindToContext(this),
				complete: function (jqXHR, textStatus) {
					$button.prop('disabled', false).css({ opacity: 1 });
				}.bindToContext(this),
			});
		},

		deleteProduct: function(event) {
			event.preventDefault();
			var $button = $(event.target);
			var url = $button.attr('href');
			$.ajax({
				url: url,
				method: 'post',
				dataType: 'json',
				data: {},
				success: function (data) {
					// Product is deleted.
					$button.prop('disabled', true);
					var $tableRow = $button.closest('tr');
					$tableRow.animate({ opacity: 0 }, 500, function () { $tableRow.remove(); });
				}.bindToContext(this),
				error: function (jqXHR, textStatus, errorThrown) {
					// Show error alert.
					var message = "Ошибка: {0} {1}".format(jqXHR.status, errorThrown);
					NotifyJsAlert.error(message, $button);
				}.bindToContext(this),
			});
		},

	};

	$(document).ready(Plugin.init.bindToContext(Plugin));

}(jQuery, window, document);