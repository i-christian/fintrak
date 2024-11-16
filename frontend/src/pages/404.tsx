import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js"

const WrongPage: Component = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div class="flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p class="text-md font-medium text-red-500">404 error</p>
          <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We can’t find that page</h1>
          <p class="mt-4">Sorry, the page you are looking for doesn't exist or has been moved.</p>

          <div class="flex items-center mt-6 gap-x-3">
            <button class="btn px-5 sm:w-auto"
              onClick={() => navigate("/")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>

              <span>Go home</span>
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default WrongPage;
