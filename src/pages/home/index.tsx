import routeConfig from '@/routes/config';
import { Link } from 'react-router-dom';

export default function Page() {
  return (
    <div>
      {routeConfig.map((item) => (
        <Link key={item} to={item}>
          {item}
        </Link>
      ))}
    </div>
  );
}
