<script lang="ts">

</script>

<div class="container">
    <h1>Contact Me</h1>
     <form name="Foodle-form" accept-charset="utf-8" action="https://formspree.io/f/xqknbywk" method="post">
              <!-- <div class="g-recaptcha" data-sitekey="6LexoLkeAAAAAAeeRiBX2wFK7nQ1eaW68mRS2J1m"></div>  -->
    <label for="fname">First Name</label>
    <input type="text" id="fname" name="First name" placeholder="Jason" required>

    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="Fast name" placeholder="Cameron " required>

    <label for="email">Email</label>
    <input type="email" id="email" name="Email" placeholder="foodlethegame@gmail.com" required>
    <label for="Issue-Type"> Issue Type</label>
         <select name="Issue Type" id="Issue-Type" required="">
      <option value="" selected="" disabled="">Select</option>
      <option value="Bug Report">Bug Report</option>
      <option value="Missing Word">Missing Word</option>
      <option value="Other">Other</option>
    </select>

    <label for="message">Subject</label>
    <textarea id="message" name="message" placeholder="Write something.." rows="2" style="height:200px"></textarea>

    <input type="submit" value="Submit">
    <input type="reset" value="Reset">

  </form>
</div>

<style>
  input[type=text], input[type=email], select, textarea{
  color: var(--bg-primary);
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}
 ::placeholder, ::-ms-input-placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--fg-primary);
  opacity: 1; /* Firefox */
}

  label {
      color: var(--fg-primary);
  }
/* Style the submit button with a specific background color etc */
input[type=submit], input[type=reset] {
  background-color: var(--fg-primary);
  color: var(--bg-primary);            /* This works */
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input:checked {
  color: var(--fg-primary);
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  background-color: var(--color-correct);
}

input[type=reset]:hover {
    background-color: var(--red);
}
/* Add a background color and some padding around the form */
.container {
    /* From https://css.glass */
        background: rgba(var(--bg-primary), 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    margin: 25px;
    padding: 32px;
}
.container h1 {
    color: var(--fg-primary);
}
</style>

