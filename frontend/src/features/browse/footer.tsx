import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='w-full bg-black text-gray-500 py-8 mt-12 border-t border-gray-800'>
      <div className='max-w-[980px] mx-auto px-[4%]'>
        <div className='flex items-center gap-6 mb-6'>
          <a
            href='https://www.facebook.com/netflix'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Facebook'
            className='text-gray-500 hover:text-white transition-colors duration-200'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13 10H17.5L17 12H13V21H11V12H7V10H11V8.128C11 6.345 11.186 5.698 11.534 5.046C11.875 4.402 12.427 3.9 13.081 3.577C13.732 3.253 14.495 3.089 15.968 3.031C16.292 3.02 16.641 3.023 17.036 3.039V5.139H16.723C15.585 5.139 15.064 5.216 14.634 5.494C14.4 5.636 14.245 5.816 14.128 6.119C13.979 6.507 13.93 6.947 13.93 8.425V10H13Z'
                fill='currentColor'
              />
            </svg>
          </a>
          <a
            href='https://www.instagram.com/netflix'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Instagram'
            className='text-gray-500 hover:text-white transition-colors duration-200'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z'
                fill='currentColor'
              />
              <path
                d='M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z'
                fill='currentColor'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z'
                fill='currentColor'
              />
            </svg>
          </a>
          <a
            href='https://twitter.com/netflix'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Twitter'
            className='text-gray-500 hover:text-white transition-colors duration-200'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M22.162 5.656C21.399 5.9937 20.589 6.21548 19.76 6.314C20.634 5.79144 21.288 4.96902 21.6 4C20.78 4.488 19.881 4.83 18.944 5.015C18.3146 4.34158 17.4804 3.89497 16.5709 3.74459C15.6615 3.59421 14.7279 3.74849 13.9153 4.18346C13.1026 4.61842 12.4564 5.30969 12.0771 6.1498C11.6978 6.98991 11.6067 7.93178 11.818 8.829C10.1551 8.74566 8.52832 8.31353 7.04328 7.56067C5.55823 6.80781 4.24812 5.75105 3.19799 4.459C2.82628 5.09745 2.63095 5.82323 2.63199 6.562C2.63199 8.012 3.36999 9.293 4.49199 10.043C3.828 10.0221 3.17862 9.84278 2.59799 9.52V9.572C2.59819 10.5377 2.93236 11.4736 3.54384 12.2211C4.15532 12.9685 5.00647 13.4815 5.95299 13.673C5.33661 13.84 4.6903 13.8647 4.06299 13.745C4.32986 14.5762 4.85 15.3032 5.55058 15.8241C6.25117 16.345 7.09712 16.6338 7.96999 16.65C7.10247 17.3313 6.10917 17.835 5.04687 18.1322C3.98458 18.4294 2.87412 18.5143 1.77899 18.382C3.69069 19.6114 5.91609 20.2641 8.18899 20.262C15.882 20.262 20.089 13.889 20.089 8.362C20.089 8.182 20.084 8 20.076 7.822C20.8949 7.23017 21.6016 6.49702 22.163 5.657L22.162 5.656Z'
                fill='currentColor'
              />
            </svg>
          </a>
          <a
            href='https://www.youtube.com/netflix'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='YouTube'
            className='text-gray-500 hover:text-white transition-colors duration-200'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5 7H19C19.5523 7 20 7.44772 20 8V16C20 16.5523 19.5523 17 19 17H5C4.44772 17 4 16.5523 4 16V8C4 7.44772 4.44772 7 5 7ZM2 8C2 6.34315 3.34315 5 5 5H19C20.6569 5 22 6.34315 22 8V16C22 17.6569 20.6569 19 19 19H5C3.34315 19 2 17.6569 2 16V8ZM10 9L14 12L10 15V9Z'
                fill='currentColor'
              />
            </svg>
          </a>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
          <div className='flex flex-col gap-4'>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Audio Description
            </Link>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Investor Relations
            </Link>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Legal Notices
            </Link>
          </div>
          <div className='flex flex-col gap-4'>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Help Center
            </Link>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Jobs
            </Link>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Cookie Preferences
            </Link>
          </div>
          <div className='flex flex-col gap-4'>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Gift Cards
            </Link>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Terms of Use
            </Link>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Corporate Information
            </Link>
          </div>
          <div className='flex flex-col gap-4'>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Media Center
            </Link>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Privacy
            </Link>
            <Link
              href='#'
              className='text-gray-500 text-xs hover:text-white hover:underline transition-colors duration-200'
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className='mb-8'>
          <button className='bg-transparent border border-gray-500 text-gray-500 text-xs py-2 px-4 cursor-pointer transition-all duration-200 hover:text-white hover:border-white'>
            Service Code
          </button>
        </div>

        <div className='text-xs mt-6'>
          <p>
            © {new Date().getFullYear()} Netflix Clone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
