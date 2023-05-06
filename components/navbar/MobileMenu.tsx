interface mobileMenuProps {
  visible?: boolean;
}
export default function MobileMenu({ visible }: mobileMenuProps) {
  if (!visible) {
    return null;
  }
  return (
    <div className='bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border border-gray-800'>
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-center text-white hover:underline'>Home</div>
        <div className='px-3 text-center text-white hover:underline'>
          Series
        </div>
        <div className='px-3 text-center text-white hover:underline'>Films</div>
        <div className='px-3 text-center text-white hover:underline'>
          New & Popular
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          My list
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Browse by Language
        </div>
      </div>
    </div>
  );
}
