<div id="invoice">
                                <div className="toolbar hidden-print">
                                    <div className="text-right">
                                        <button id="printInvoice" className="btn btn-info"><i className="fa fa-print"></i> Print</button>
                                        <button className="btn btn-info"><i className="fa fa-file-pdf-o"></i> Export as PDF</button>
                                    </div>
                                    <hr></hr>
                                </div>
                                <div className="invoice overflow-auto">
                                    <div style={this.invoice}>
                                        <header>
                                            <div className="row">
                                                <div className="col-6">
                                                    <a target="_blank" href="https://lobianijs.com">
                                                        <img src="http://lobianijs.com/lobiadmin/version/1.0/ajax/img/logo/lobiadmin-logo-text-64.png" data-holder-rendered="true" />
                                                        </a>
                                                </div>
                                                <div className="row col-6 company-details">
                                                    <h2 className="name col-12">
                                                        <a target="_blank" href="https://lobianijs.com">
                                                        Arboshiki
                                                        </a>
                                                    </h2>
                                                    <div className="col-12">455 Foggy Heights, AZ 85004, US</div>
                                                    <div className="col-12">(123) 456-789</div>
                                                    <div className="col-12">company@example.com</div>
                                                </div>
                                            </div>
                                        </header>
                                        <main>
                                            <div className="row contacts">
                                                <div className="col invoice-to">
                                                    <div className="text-gray-light">INVOICE TO:</div>
                                                    <h2 className="to">John Doe</h2>
                                                    <div className="address">796 Silver Harbour, TX 79273, US</div>
                                                    <div className="email"><a href="mailto:john@example.com">john@example.com</a></div>
                                                </div>
                                                <div className="col invoice-details">
                                                    <h1 className="invoice-id">INVOICE 3-2-1</h1>
                                                    <div className="date">Date of Invoice: 01/10/2018</div>
                                                    <div className="date">Due Date: 30/10/2018</div>
                                                </div>
                                            </div>
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th className="text-left">DESCRIPTION</th>
                                                        <th className="text-right">HOUR PRICE</th>
                                                        <th className="text-right">HOURS</th>
                                                        <th className="text-right">TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="no">04</td>
                                                        <td className="text-left"><h3>
                                                            <a target="_blank" href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w">
                                                            Youtube channel
                                                            </a>
                                                            </h3>
                                                        <a target="_blank" href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w">
                                                            Useful videos
                                                        </a> 
                                                        to improve your Javascript skills. Subscribe and stay tuned :)
                                                        </td>
                                                        <td className="unit">$0.00</td>
                                                        <td className="qty">100</td>
                                                        <td className="total">$0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="no">01</td>
                                                        <td className="text-left"><h3>Website Design</h3>Creating a recognizable design solution based on the company's existing visual identity</td>
                                                        <td className="unit">$40.00</td>
                                                        <td className="qty">30</td>
                                                        <td className="total">$1,200.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="no">02</td>
                                                        <td className="text-left"><h3>Website Development</h3>Developing a Content Management System-based Website</td>
                                                        <td className="unit">$40.00</td>
                                                        <td className="qty">80</td>
                                                        <td className="total">$3,200.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="no">03</td>
                                                        <td className="text-left"><h3>Search Engines Optimization</h3>Optimize the site for search engines (SEO)</td>
                                                        <td className="unit">$40.00</td>
                                                        <td className="qty">20</td>
                                                        <td className="total">$800.00</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colspan="2"></td>
                                                        <td colspan="2">SUBTOTAL</td>
                                                        <td>$5,200.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2"></td>
                                                        <td colspan="2">TAX 25%</td>
                                                        <td>$1,300.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2"></td>
                                                        <td colspan="2">GRAND TOTAL</td>
                                                        <td>$6,500.00</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <div className="thanks">Thank you!</div>
                                            <div className="notices">
                                                <div>NOTICE:</div>
                                                <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
                                            </div>
                                        </main>
                                        <footer>
                                            Invoice was created on a computer and is valid without the signature and seal.
                                        </footer>
                                    </div>
                                    <div></div>
                                </div>
                            </div>