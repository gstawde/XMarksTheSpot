import XMarksLogo from '../assets/XMarksLogo.png';

const SignupPage = () => {
  return (
    <div class="bg-xmts-darkbrown flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 overflow-auto">
      <div class="w-full md:mt-0 sm:max-w-md xl:p-0 overflow-auto">
        <div class="flex justify-center h-24">         
          <img class="max-h-full w-auto" src={XMarksLogo} alt="Image Logo" />
        </div>
        
        <h1 class="text-xmts-yellow text-5xl text-center">Let's Get to Know You a Bit!</h1>
        
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form class="space-y-4 md:space-y-6" action="x">
            <div>
              <label for="fname" class="text-xmts-tan text-lgfont-medium">First Name</label>
              <input type="fname" name="fname" id="fname" placeholder="First Name" required
                class="bg-xmts-tan rounded-lg w-full p-2"></input>
            </div>

            <div>
              <label for="lname" class="text-xmts-tan text-lgfont-medium">Last Name</label>
              <input type="lname" name="lname" id="lname" placeholder="Last Name" required
                class="bg-xmts-tan rounded-lg w-full p-2"></input>
            </div>

            <div>
              <label for="email" class="text-xmts-tan text-lgfont-medium">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" required
                class="bg-xmts-tan rounded-lg w-full p-2"></input>
            </div>

            <div>
              <label for="password" class="text-xmts-tan text-lgfont-medium">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" required
                class="bg-xmts-tan rounded-lg w-full p-2"></input>
            </div>

            <div>
              <label for="confirm-password" class="text-xmts-tan text-lgfont-medium">Confirm password</label>
              <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" required
                class="bg-xmts-tan rounded-lg w-full p-2"></input>
            </div>
            
            <div class="flex items-center justify-center">
               {/*When user signs up, they should be redirected to user dashboard*/}
              <button type="submit" class="bg-xmts-yellow w-1/3 font-medium rounded-lg px-5 py-2.5 text-center">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SignupPage;