interface SvgProps {
  className?: string;
  id: string;
}

const Svg = ({ className, id }: SvgProps) => {
  return (
    <svg width={16} height={16} className={className ? className : undefined}>
      <use href={`/sprite.svg#icon-${id}`}></use>
    </svg>
  );
};

export default Svg;
