$( document ).ready(function() {

	chrome.storage.sync.get({ gradients: true, controls: false, auto: false }, (items) => {
		$("body").append($("<form>").css({"margin":"20px"})
			.append($("<div>").addClass("mb-3 form-check")
				.append($("<input>").attr({"type":"checkbox", "id":"gradients"}).addClass("form-check-input").prop({"checked":items.gradients}).on("change", function() {
					items.gradients = $(this).is(":checked")
					items.controls = !$(this).is(":checked")
console.log(items)
					$("#controls").prop({"checked":items.controls})
					chrome.storage.sync.set(items);


					}))
				.append($("<label>").attr({}).addClass("form-check-label").html("Only Gradients"))
				)
			.append($("<div>").addClass("mb-3 form-check")
				.append($("<input>").attr({"type":"checkbox", "id":"controls"}).addClass("form-check-input").prop({"checked":items.controls}).on("change", function() {
					items.controls = $(this).is(":checked")
					items.gradients = !$(this).is(":checked")
console.log(items)
					$("#gradients").prop({"checked":items.gradients})
					chrome.storage.sync.set(items);
					}))
				.append($("<label>").attr({}).addClass("form-check-label").html("Controls and Gradients"))
				)
			.append($("<div>").addClass("mb-3 form-check")
				.append($("<input>").attr({"type":"checkbox", "id":"auto"}).addClass("form-check-input").prop({"checked":items.auto}).on("change", function() {
					items.auto = $(this).is(":checked")
console.log(items)
					chrome.storage.sync.set(items);
					}))
				.append($("<label>").attr({}).addClass("form-check-label").html("Automatically Detect"))
				)
			)
		})
	})


