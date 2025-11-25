import { CookingForm } from "./cookingForm";


export function CookingPage(){
  return(
    <div className="min-h-screen w-full px-10 md:px-20 bg-gradient-to-br from-orange-100 via-rose-50 to-amber-100 p-4">
      <CookingForm/>
    </div>
  )
}