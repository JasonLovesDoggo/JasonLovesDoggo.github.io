<script lang="ts">

</script>

<h1>Contact Me</h1>
<div>
	After each guess, the color of the tiles will change to show how close your guess was to the
	word.
</div>
<form id="fs-frm" name="department-contact-form" accept-charset="utf-8" action="https://formspree.io/f/xqknbywk" method="post">
  <fieldset id="fs-frm-inputs">
    <div class="g-recaptcha" data-sitekey="6LexoLkeAAAAAAeeRiBX2wFK7nQ1eaW68mRS2J1m"></div>
    <label for="full-name">Full Name</label>
    <input type="text" name="name" id="full-name" placeholder="First and Last" required="">
    <label for="email-address">Email Address</label>
    <input type="email" name="email" id="email-address" placeholder="email@domain.tld" required="">
	<input type="tel" name="telephone" id="telephone" placeholder="(555) 555-5555">
    <label for="Issue-Type">Issue Type</label>
    <select name="department" id="Issue-Type" required="">
      <option value="" selected="" disabled="">Select</option>
      <option value="Bug Report">Bug Report</option>
      <option value="Missing Word">Missing Word</option>
      <option value="Shipping Receiving">Shipping / Receiving</option>
      <option value="Billing Accounting">Billing / Accounting</option>
    </select>
    <label for="message">Message</label>
    <textarea rows="5" name="message" id="message" placeholder="Put your message here." required=""></textarea>
    <input type="hidden" name="_subject" id="email-subject" value="Foodle Form Submission">
  </fieldset>
  <input type="submit" value="Send Message">
  <input type="reset" value="Reset form">
</form><style>
#fs-frm input,
#fs-frm select,
#fs-frm textarea,
#fs-frm fieldset,
#fs-frm label,
#fs-frm label,
#fs-frm ::placeholder {
  font-size: .825rem;
  margin-bottom: .5rem;
  padding-top: .2rem;
  display: flex;
  align-items: baseline;
}

/* border, padding, margin, width */
#fs-frm input,
#fs-frm select,
#fs-frm textarea,
#fs-frm input:focus,
#fs-frm select:focus,
#fs-frm textarea:focus {
  background-color: white;
  outline: gray solid thin;
  outline-offset: -1px;
}
#fs-frm [type="text"],
#fs-frm [type="email"] {
  width: 100%;
}
#fs-frm [type="submit"],
#fs-frm [type="reset"] {
  width: auto;
  cursor: pointer;
  -webkit-appearance: button;
  -moz-appearance: button;
}
#fs-frm [type="submit"]:focus,
#fs-frm [type="reset"]:focus {
  outline: none;
}
#fs-frm [type="submit"],
#fs-frm [type="reset"] {
  margin-bottom: 0;
}
#fs-frm select {
  text-transform: none;
}


</style>