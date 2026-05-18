import {
  Menu,
  X
} from 'lucide-react'

import { useState } from 'react'

import Sidebar from './Sidebar'

function MobileSidebar() {

  const [open, setOpen] =
    useState(false)

  return (
    <>

      <button
        onClick={() =>
          setOpen(true)
        }
        className='lg:hidden fixed top-4 left-4 z-50 bg-[#0B1F4D] text-white p-3 rounded-xl'
      >

        <Menu />

      </button>

      {
        open && (

          <div className='fixed inset-0 z-50 bg-black/50 lg:hidden'>

            <div className='w-[260px] h-full bg-[#0B1F4D] relative'>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className='absolute top-4 right-4 text-white'
              >

                <X />

              </button>

              <Sidebar />

            </div>

          </div>
        )
      }

    </>
  )
}

export default MobileSidebar