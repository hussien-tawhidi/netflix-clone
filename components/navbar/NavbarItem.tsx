interface itemProps{
    label:string
}
export default function NavbarItem({label}:itemProps) {
  return (
      <div className='text-white cursor-pointer hover:text-gray-300 transition duration-200'>{label}</div>
  )
}
