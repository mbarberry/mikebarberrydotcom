import { chakra } from '@chakra-ui/react';

export default function Footer() {
  return (
    <chakra.footer
      h='100px'
      bgColor='#eeeeee'
      bottom='0'
      w='100%'>
      <chakra.span
        pl='30px'
        float='left'
        bottom='-60px'
        position='relative'
        letterSpacing='0.1rem'
        fontSize='small'>
        CC Attribution Littlest Tokyo by Glen Fox
      </chakra.span>
      <chakra.span
        pr='30px'
        float='right'
        bottom='-60px'
        position='relative'
        letterSpacing='0.1rem'
        fontWeight='500'>
        2023 &nbsp; &nbsp; mikebarberry.com
      </chakra.span>
    </chakra.footer>
  );
}
