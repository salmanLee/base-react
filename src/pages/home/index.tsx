import routeConfig from '@/routes/config';
import { Link } from 'react-router-dom';

export default function Page() {
  return (
    <div>
      {routeConfig.map((item) => (
        <div key={item}>
          <Link to={item}>{item}</Link>
        </div>
      ))}
    </div>
  );
}
