const isPrivateIP = (ip) => {
  if (!ip) return true;
  return (
    ip === '::1' ||
    ip === '127.0.0.1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('::ffff:127.')
  );
};

const getLocationFromIP = async (ip) => {
  try {
    if (isPrivateIP(ip)) {
      return 'Local network (unavailable)';
    }

    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,country`);
    const data = await response.json();

    if (data.status === 'success') {
      return [data.city, data.country].filter(Boolean).join(', ') || 'Unknown location';
    }

    return 'Unknown location';
  } catch (err) {
    console.error('Geolocation lookup failed:', err);
    return 'Unknown location';
  }
};

module.exports = { getLocationFromIP };