import React from "react";

function Bootstrap() {
    return (
      <>
        <main className="main">
          <section className="jumbotron text-center">
            <div className="container">
              <img className="card-img-top" data-src="loundry-pic.jpeg" src="loundry-pic.jpeg" data-holder-rendered="true"></img>
              <div className="jumbotron-heading">
              </div>
            </div>
          </section>

          <div className="album py-5 bg-light">
            <div className="container">
              <div className="äranden">
                <h1>Vad kan vi hjälpa dig med?</h1>
                <hr />
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="helhets-städning.jpeg" alt="Thumbnail [100%x225]" src="helhets-städning.jpeg" data-holder-rendered="true"></img>
                    <div className="card-body">
                      <p className="card-text">Allmänt/ alla utrymmen </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">Boka</button>
                        </div>
                        <small className="text-muted">ca. 2h</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="vardagsrummet.jpeg" alt="Thumbnail [100%x225]" src="vardagsrummet.jpeg" data-holder-rendered="true"></img>
                    <div className="card-body">
                      <p className="card-text">Vardagsrummet</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">Boka</button>
                        </div>
                        <small className="text-muted">Ca. 1h</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="nedladdning.jpeg" alt="[100%x225]" src="nedladdning.jpeg" data-holder-rendered="true"></img>
                    <div className="card-body">
                      <p className="card-text">Köket</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">Boka</button>
                        </div>
                        <small className="text-muted">Ca. 2h</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="sovrum städning.jpeg" alt="Thumbnail [100%x225]" src="sovrum städning.jpeg" data-holder-rendered="true"></img>
                    <div className="card-body">
                      <p className="card-text">Sovrum</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">Boka</button>
                        </div>
                        <small className="text-muted">Ca. 1h</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="fönster.jpeg" alt="Thumbnail [100%x225]" src="fönster.jpeg" data-holder-rendered="true"></img>
                    <div className="card-body">
                      <p className="card-text">Fönsterputtsning</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">Boka</button>
                        </div>
                        <small className="text-muted">Ca. 1h</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="flyttstädning2.jpeg" alt="Thumbnail [100%x225]" src="flyttstädning2.jpeg" data-holder-rendered="true"></img>
                    <div className="card-body">
                      <p className="card-text">Flyttstädning</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">Boka</button>
                        </div>
                        <small className="text-muted"></small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="text-muted">
          <div className="container">
            <p className="float-right">
              <a href="#">Back to top</a>
            </p>
          </div>
        </footer>
      </>
    )
  
}
  export default Bootstrap;