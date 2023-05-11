import { ArrowLongLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import Button from '~/components/Button'
import layout from '~/constants/layout'

const Dashboard = () => {
  return (
    <>
      <h2>Size</h2>
      <div className='space-x-1'>
        <Button size='xs'>Button</Button>
        <Button size='sm'>Button</Button>
        <Button size='md'>Button</Button>
        <Button size='lg'>Button</Button>
      </div>

      <h2>Color</h2>
      <div className='space-x-1'>
        <Button color='green'>Button</Button>
        <Button color='blue'>Button</Button>
        <Button color='yellow'>Button</Button>
        <Button color='red'>Button</Button>
        <Button color='black'>Button</Button>
      </div>

      <h2>Border radius</h2>
      <div className='space-x-1'>
        <Button>Button</Button>
        <Button pill>Button</Button>
      </div>

      <h2>Outline</h2>
      <div className='space-x-1'>
        <Button outline color='green'>
          Button
        </Button>
        <Button outline color='blue'>
          Button
        </Button>
        <Button outline color='yellow'>
          Button
        </Button>
        <Button outline color='red'>
          Button
        </Button>
        <Button outline color='black'>
          Button
        </Button>
      </div>

      <h2>Icon</h2>
      <div className='flex items-center space-x-1'>
        <Button leftIcon={ShoppingCartIcon}>Button</Button>
        <Button rightIcon={ShoppingCartIcon}>Button</Button>
      </div>

      <h2>Icon Button</h2>
      <div className='flex items-center space-x-1'>
        <Button outline iconButton={ArrowLongLeftIcon} />
        <Button iconButton={ArrowLongLeftIcon} pill />
        <Button loading iconButton={ArrowLongLeftIcon} pill />
      </div>

      <h2>Disabled</h2>
      <div className='flex items-center space-x-1'>
        <Button disabled>Button</Button>
      </div>

      <h2>Event click</h2>
      <div className='flex items-center space-x-1'>
        <Button
          onClick={() => {
            alert('clicked')
          }}
        >
          Button
        </Button>
      </div>

      <h2>Loading</h2>
      <div className='flex items-center space-x-1'>
        <Button loading>Button</Button>
        <Button outline loading>
          Button
        </Button>
      </div>

      <h2>Anchor As Button</h2>
      <div className='flex items-center space-x-1'>
        <Button link={'https://heroicons.com/'} target='_blank'>
          Go to heroicons.com with target=&quot;_blank&quot;
        </Button>
        <Button link={'https://heroicons.com/'}>Go to heroicons.com</Button>
      </div>
    </>
  )
}

Dashboard.layout = layout.admin

export default Dashboard
