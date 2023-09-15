const Dashboard: React.FC = () => {

  return (
    <div style={{ width: '100%', height: '100vh' }}>
    <iframe
      title="ALL CHANNEL DASHBOARD"
      style={{ width: '100%', height: '100%' }}
      src="https://app.powerbi.com/reportEmbed?reportId=e37360c8-956a-4fc4-a932-1384cc2c64ab&autoAuth=true&ctid=d2c967e6-4fc7-452c-9e79-f78c68ccf915"
      frameBorder={0}
      allowFullScreen
    ></iframe>
  </div>
  )
};

export default Dashboard;
