const Dashboard: React.FC = () => {

    return (
      <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="Master daily report"
        style={{ width: '100%', height: '100%' }}
        src="https://app.powerbi.com/view?r=eyJrIjoiYjYxMGZjZDMtNzJiNi00MjY0LTgyOTAtYThlOTkzYWRmYmYxIiwidCI6ImQyYzk2N2U2LTRmYzctNDUyYy05ZTc5LWY3OGM2OGNjZjkxNSJ9"
        allowFullScreen
      ></iframe>
    </div>
    )
  };
  
  export default Dashboard;