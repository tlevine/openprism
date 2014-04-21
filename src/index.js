// var request = require('browser-request')
var jQuery = require('jquery-browserify')
function request(url, callback) {
  jQuery.getJSON(url, null)
    .done(function(json) {callback(null, null, JSON.stringify(json))})
    .fail(function(jqxhr, textStatus, error ) {
      callback(textStatus + ', ' + error, null, null)
    })
}
var jsonp = require('dlite-jsonp')

exports.socrata_portals = [
  'data.colorado.gov',
  'data.nola.gov',
  'healthmeasures.aspe.hhs.gov',
  'data.cityofchicago.org',
  'data.wa.gov',
  'opendata.go.ke',
  'data.austintexas.gov',
  'data.cityofnewyork.us',
//'info.samhsa.gov',
  'data.taxpayer.net',
  'data.cityofmadison.com',
  'data.slcgov.com',
  'data.illinois.gov',
  'data.somervillema.gov',
  'iranhumanrights.socrata.com',
  'data.hawaii.gov',
  'data.maryland.gov',
  'data.ny.gov',
  'data.mo.gov',
  'data.nfpa.org',
//'nmfs.socrata.com',
  'data.govloop.com',
  'data.sunlightlabs.com',
  'electionsdata.kingcounty.gov',
  'data.undp.org',
  'deleon.socrata.com',
  'data.energystar.gov',
  'explore.data.gov',
  'data.weatherfordtx.gov',
  'bronx.lehman.cuny.edu',
  'data.sfgov.org',
  'data.edmonton.ca',
  'data.consumerfinance.gov',
  'www.metrochicagodata.org',
  'data.kingcounty.gov',
  'data.baltimorecity.gov',
  'health.data.ny.gov',
//'dati.lombardia.it',
  'datacatalog.cookcountyil.gov',
  'www.opendatanyc.com',
  'cookcounty.socrata.com',
  'data.oregon.gov',
  'data.oaklandnet.com',
  'data.raleighnc.gov',
  'finances.worldbank.org',
  'data.honolulu.gov',
  'opendata.socrata.com',
  'data.cityofboston.gov',
  'data.ok.gov',
  'data.cms.gov',
//'data.snostat.org',
  'www.halifaxopendata.ca',
  'data.wellingtonfl.gov',
  'gettingpastgo.socrata.com',
  'www.data.act.gov.au',
  'data.redmond.gov',
  'data.seattle.gov',
  'data.montgomerycountymd.gov',
  'data.acgov.org',
  'data.medicare.gov'
]
exports.junar_portals = [
  // https://twitter.com/javierpajaro/status/363332649072336896
  'datos.gob.cl',
  'lima.datosabiertos.pe',
  'bahiablanca.opendata.junar.com',
  'recursos.penalolen.opendata.junar.com',
  'datosabiertos.gob.go.cr',

  // https://twitter.com/javierpajaro/status/363333894931628034
  'paloalto.opendata.junar.com',
  'cupertino.opendata.junar.com',
  'data.sanjoseca.gov',
  // 'sacramento.opendata.junar.com',

  // https://twitter.com/javierpajaro/status/363333894931628034
  'www.opendatalatinoamerica.org',
  'data.lanacion.com.ar',
  'infodatos.opendata.junar.com'
].filter(function(portal) {
  return portal.match('.opendata.junar.com')
})
exports.ckan_portals = [
  'datahub.io',
  'opendata.comune.bari.it',
  'africaopendata.org',
//'www.amsterdamopendata.nl/home',
  'opendata.aragon.es',
  'daten.berlin.de',
  'data.buenosaires.gob.ar',
  'ie.ckan.net',
  'it.ckan.net',
  'rs.ckan.net',
  'br.ckan.net',
  'datos.codeandomexico.org',
  'cz.ckan.net',
//'dados.gov.br',
//'dadosabertos.senado.gov.br',
//'dados.novohamburgo.rs.gov.br',
//'data.gv.at',
//'data.linz.gv.at',
//'fi.thedatahub.org',
//'data.norge.no',
  'data.sa.gov.au',
//'www.data.gc.ca',
  'data.gov.sk',
  'data.gov.uk',
  'data.qld.gov.au',
  'data.openpolice.ru',
  'datacatalogs.org',
  'www.datagm.org.uk',
//'datagov.ru',
  'datakilder.no',
//'datospublicos.org',
//'data.denvergov.org',
//'ckan.emap.fgv.br',
//'open-data.europa.eu',
//'www.healthdata.gov',
//'www.hri.fi',
  'data.graz.gv.at',
///daten.hamburg.de',
  'data.codeforhouston.com',
  'iatiregistry.org',
  'data.klp.org.in',
//'thedatahub.kr',
  'www.nosdonnees.fr',
  'offenedaten.de',
  'data.opencolorado.org',
  'catalog.opendata.in.th',
  'www.opendatahub.it',
  'dati.trentino.it',
  'data.openva.com',
  'www.opendata-hro.de',
  'opengov.es',
  'data.ottawa.ca',
  'data.overheid.nl',
  'www.opendata.provincia.roma.it',
  'publicdata.eu',
  'www.daten.rlp.de',
  'www.rotterdamopendata.nl',
  'data.cityofsantacruz.com',
  'thedatahub.org',
  'dati.toscana.it'
]
exports.opendatasoft_portals = [
  'data.iledefrance.fr',
  'opendata.paris.fr.opendatasoft.com',
  'tourisme04.opendatasoft.com',
  'tourisme62.opendatasoft.com',
  'grandnancy.opendatasoft.com',
  'bistrotdepays.opendatasoft.com',
  'scisf.opendatasoft.com',
  'pod.opendatasoft.com',
  'dataratp.opendatasoft.com',
  'public.opendatasoft.com'
]

exports.socrata = function(terms, portal, page) {
  var url = 'https://' + portal + '/api/search/views.json?limit=1&page=' + page + '&q=' + encodeURIComponent(terms);
  request(url, function(err, res, body) {
    var data = JSON.parse(body)
    if (data.count > 0){
      var view = data.results[0].view
      var url = 'http://' + portal + '/-/-/' + view.id
      var description = typeof(view.description) === 'undefined' ? '' : '<p>' + view.description + '</p>'
      return exports.render_result(portal, url, view.name, description)
    }
  })
}

exports.openei = function(terms, page) {
  var item_index = page - 1
  var url = 'https://en.openei.org/services/api/content_assist/recommend?callback=%3F&version=1&topic=' + encodeURIComponent(terms);
  jsonp(url, function(data_raw) {
    var data = data_raw.pages.filter(function(result) { return result.type === 'Datasets' })
    console.log(data_raw)
    console.log(data)
    if (data.length >= page){
      var view = data[item_index]
      var url = 'https://en.openei.org' + view.link
      return exports.render_result('en.openei.org', url, view.name, '')
    }
  })
}

exports.junar_api_key = function() {
  var keys = [
    '9556a702147d641a32483f7221324273353abd76',
    '4910262054ffbfd089d9dc176dc98e5d2ece8468',
    'e41f93ee28eec1ac377936f37ad302a91a8a6e10',
    '26ffe5aa633fd12276e24e5ada93af08dd23b60f',
    '2f5be7ef1921417aa5cb5aebabd48fd54dddb521',
    '56633bd81bf47800a5e40c848a14d9914a4005d5',
    '1a406178389fb9f3054fb863c5c04e31e71a5270',
    'eea8b8509a861e1a45cc01a6125cb174f6d85e1d',
    'e8b9742757686bd760e1f9334e50e96b1ef38a92',
    '03111f4444c33fff844ce434e0fecb9f4f9379e9',
    'b82791cece03caa8f31fb59e98cefd81189c276c',
    'da782fcac90afb0a310f72a4f63baff6d26fc0b1',
    '16a764cdfcc53b477fdb840e39cfd230e4d1753d',
    'd11d722080adceef37ebbbad1ceeb32619ce1ba6',
    'b3e25bb953e3bb0cdd2044db50ba2dfcd660c766',
    'a36580d1a991bf8fe115b9218ea7da3b1b8ffafa',
    '3bee1d8aead2246c78903ea7920bff92b7792da7',
    '5b0869fb4c4952ae073eacd6feebcf0559fcb9c8',
    'b588631cd7d5deb3bd7d46ac7ae1378d2ad04159',
    '08835ac6e7d121e17882289b19aa437e0159f5ae',
    'b84a90aed31318bc64faf834374c011ad96bf6a2',
    '7d55cb9eff11f81d5716da60cc21b29ffb2ad295',
    '6a02f6d92590f38129bcb4e76d21913e17e606f7',
    '1b82255d444ed92c4b5181253303ddfe5dd0e5ff',
    'b011780564777e93dc948a092a0ed4dff35d09d1',
    'f75bb2b65e64d7174dc9c4a3e870c68ea1ce3943',
    '3754eb52273440765ebc7e206349237a63061229',
    'c36f8da1fb761a91e4d6bc3b006bd752d5711f1d',
    '59db4538b97f33aaeeac740400402e16c28cfd7e',
    '7caedb67198c650753bf5c596e1236d6b12e5f6d',
    '70fa27f948b151a061765de07b39a2dd9ee1555d',
    '73d2f6416b85dde8057589c363fb3b3dce253a57',
    'd4933cf177244b0b804ccc7eeeea1f2adb91741a',
    'aa034f6c6d7193f236c397ea4ca4c2993771f6d8',
    '2e1aa1d10d58a857c1c1549ac3b42cb43d2c25c2',
    '04f5e121714a5b533925aa96d2a156de7d9300eb',
    'bddd6724543317828c020137a14b0535a2f081c3',
    'c25b53da313b16ebe355aabbce6cc4df5f925ac3',
    '2d05372318fd217566e4cdc59be987924ebbd06f',
    'aad1bca7c4c5fce0970937bfcef3a80adaad5d02',
    'cb3a94484d2dc711aae268671fdda807874719ba',
    '60c17ab51cf931af96e90bbecc1e96651b4eac8e',
    'e3b5d021f25fba00696ae6d2237d099a01888262',
    '3e08311cc2fb9f793886dadc07ac58c902621454',
    'b047498e519b574fd771c9e30c12296534b0beb1',
    '674e3031c835f4a06edea41a44b6a735c57fdfd6',
    'ab4db215f0813bc360a5a3351ea5329b739b7eed',
    '3420a065aa79c022360245383602d50a35d6b4b7',
    'dadffe542147077503b072f8ff407b3d12137ced',
    'c0717bffc61f65aa9304ecfd4fb5868b896d6be0',
    '4cac102267fc299d32ee097f3a0b3cc1e1f62f17',
    '3dbfb62a66ceed413aab7cdc440f48a9e88bdcb7',
    'a881551d454cf911c717de80d0f8c4ac25d6c941',
    'a6f9e96447165e1faea4cc66295d87e326bb459a',
    '1cd0d65a7a9e6d6a6e4c5e99bf5b1d6205c17014',
    'c4e6c82cf2485008cd1ead49691a0bf27b73448d',
    '3ebfc06e4644fd2e64246807fe663eeae3f39448',
    '566f0a4deefc87eee86cbd33882504a00d58d55d',
    'be6f0dcd33bd84e42549355b1e797962d5d1afc9',
    '5b1d003bcb2306af8cb588eb630ff9c29ab50462',
    '0d47f928a8189c7ff510c3a4ef69c46ec9959533',
    '92e5008f3b9d2d044bd0d933930fab258dfda7fb',
    'f1e67144c052327cebaad80e8cfe2e2872c6dd7e',
    '136ed5eb7018cb167eba8a1ccc81a98b1eb88f4d',
    '4681b6d4045101256951ba10e56091d1833799cb',
    'a585bab20d71bfcd96fa529009a2e3656fae060b',
    '7be6606e81f72824826ca839fff36fa4d4c43ecf',
    '2dbe5fc096b42ed66e30ff9ed75764246bf52415',
    '3ce11c5786f03e7c02a615e3d4a9266c32ffc904',
    'db68d1ba3e5e71750cb516c0865aa0acc76cd502',
    '52935e771f0dc3fcce3ce3aea2ecd1caf3935f74',
    'f8655be7bb1c24aae04b5a9a2bd4ad843477c255',
    '38f9b91a2cda3d7fbc8bca72686b70067f559682',
    'decb10bcee62b6947315f54f15ae32abd40f8ee2',
    '519951eeb28ecd2f84603d26077ec20ca73e128b',
    '64b1a40396ea67f79fc5d9c8dfdeaa82f640f626',
    'ea85bc620aa04f0578c7ce175680b118888aef04',
    '542e2a45697b6a549ecce822a5be8b5b48941cd8',
    '87a7cfaa20da42037e035cf5458eec86cae3c753',
    '9d1c319e8f907aae54d2ebecc54c02233bf91efb',
    'dd3d83abe444f9e4bf798f874cc14466592889f3',
    '22f3a329f1a4442d0d7774314826572ed5f7abf2',
    '8c1a9daa9668829fa55aeb373d7f8011f42e624a',
    '42305ba3769f129ff42987227746bf869fdf10a7',
    'f049e352a4b3fc1d49c8c1ca04f2a7ee22f5f49e',
    '4c82d6c821196c01e67c409c8cfa17745b759b9b',
    '3f8c06515046fd2f37f9d2f0e9f1bef79dc6dc8f',
    '25607b5c390d584a5501509c254c58c576ac59ae',
    '616fd6accaf895251fdcad3fe7cd848cc84b54ec',
    '9c0bb9036bf1625d2222a427655b509ffd4f2611',
    '9fd1c6da129812c43f29bbe8560edc4ae641ebde',
    '903ec07597052e2ddfa65b41f904c32cb5040601',
    '590c3ee981c4a479f44f80a5535a66cab608ce2e',
    'b1dd85b46609c4558e899ec0b54a029a1421cd1c',
    '329f0046c2b4deb86680f2760d392657477509a6',
    'bd08630ebb31b3cb3ba697848d6315ea58bb81b9',
    '435a5d7b83ac83e1bac2366e86818f0460b0a58c',
    '16d8c3331b29728888edccf24576e520c2ee5354',
    'df1b94812c67d5dc25e19ee77d9f3ca920e08af6',
    'addda365a63c6d71999a5c112869ba9fa2d1aa5a',
    'cbe0c70f2552ac7f4fafd856c5aa6fbfbfe20aea',
    '518d0c178e498bc245c8b1541b44a6b144cd0416',
    'e95121cd5d273c305d07609a165f0ac1da1e03f7',
    '175049e9ea5032912a32483e197b93b8311de682',
    'fc42397e555644c2eac7dbd33b47cfaa17229a5b'
  ]
  return keys[Math.floor(Math.random()*keys.length)]
}

exports.junar = function(terms, portal, page) {
  // paloalto.cloudapi.junar.com -> paloalto.opendata.junar.com
  var api = 'http://' + portal.replace('opendata.junar.com', 'cloudapi.junar.com')

  var url = api + '/datastreams/search?query=' + encodeURIComponent(terms) + '&auth_key=' + exports.junar_api_key() + '&max_results=' + page + '&callback=%3F'
  jsonp(url, function(data) {
    if (data && data.length > 0) {
      var view = data.pop()
      return exports.render_result(portal, view.link, view.title, view.description)
    }
  })
}

exports.ckan = function(terms, portal, page) {
  var url = 'http://' + portal + '/api/search/dataset?q=' + encodeURIComponent(terms) + '&start=' + page + '&rows=1'
  request(url, function(err, res, body) {
    if (!err) {
      var data = JSON.parse(body)
      if (data.results.length > 0){
        var id = data.results[0]
        request('http://' + portal + '/api/rest/dataset/' + id, function(err, res, body) {
          if (!err) {
            var dataset = JSON.parse(body)
            var url = 'http://' + portal + '/dataset/' + id
            return exports.render_result(portal, url, dataset.title, dataset.notes_rendered)
          }
        })
      }
    }
  })
}

exports.opendatasoft = function(terms, portal, page) {
  var url = 'http://' + portal + '/api/datasets/1.0/search?rows=1&q=' + encodeURIComponent(terms) + '&start=' + page
  request(url, function(err, res, body) {
    if (!err) {
      var data = JSON.parse(body)
      if (data.nhits > 0) {
        var dataset = data.datasets[0]
        var datasetUrl = 'http://' + portal + '/explore/dataset/' + dataset.datasetid
        return exports.render_result(portal, datasetUrl, dataset.metas.title, dataset.metas.description)
      }
    }
  })
}

exports.clear_result = function(portal) {
  document.getElementById(portal).setAttribute('style', 'display: none;')
  var a = document.querySelector('section[id="' + portal + '"] a')
  var em = document.querySelector('section[id="' + portal + '"] em')
  var desc = document.querySelector('section[id="' + portal + '"] .desc')

  a.textContent = ''
  desc.innerHTML = ''
  em.textContent = ''
}

exports.render_result = function(portal, href, name, description) {
  document.getElementById(portal).setAttribute('style', '')
  document.getElementById('loading').setAttribute('style', 'display: none;')
  document.querySelector('#search a.next').setAttribute('style', '')
  document.querySelector('#search p.chrome').setAttribute('style', 'display: none;')
  var a = document.querySelector('section[id="' + portal + '"] a')
  var em = document.querySelector('section[id="' + portal + '"] em')
  var desc = document.querySelector('section[id="' + portal + '"] .desc')

  a.href = href
  a.textContent = name
  desc.innerHTML = description
  em.textContent = portal
}

exports.portals = function() {
  return exports.socrata_portals.concat(exports.junar_portals.concat(exports.ckan_portals.concat(exports.opendatasoft_portals))).concat(['en.openei.org'])
}

exports.search = function() {
  var url = [location.protocol, '//', location.host, location.pathname].join('')
  var hash = '/' + encodeURIComponent(exports.terms()) + '/' + exports.page
  window.location.hash = hash
  if (window._paq) {
    window._paq.push(['trackPageView', url + '#' + hash])
  }

  exports.portals().map(exports.clear_result)
  document.getElementById('loading').setAttribute('style', '')
  exports.openei(exports.terms(), exports.page)
  exports.socrata_portals.map(function(portal) {
    exports.socrata(exports.terms(), portal, exports.page)
  })
  exports.junar_portals.map(function(portal) {
    exports.junar(exports.terms(), portal, exports.page)
  })
  exports.ckan_portals.map(function(portal) {
    exports.ckan(exports.terms(), portal, exports.page)
  })
  exports.opendatasoft_portals.map(function(portal) {
    exports.opendatasoft(exports.terms(), portal, exports.page)
  })
}

exports.increment_page = function(increment) {
  exports.page += increment
  exports.search()
}
exports.next = function() {
  exports.increment_page(1)
}
exports.prev = function() {
  if (exports.page > 1) { exports.increment_page(-1) }
}


exports.terms = function() {
  return document.querySelector('#search > input[name="terms"]').value
}

exports.portals().map(function(portal) {
  document.getElementById('result').innerHTML += '<section style="display: none;" id="' + portal + '" class="dataset"><h1><a target="_blank" href=""></a></h1><em class="portal"></em><div class="desc"></div></section>'
})

exports._prev_search_terms = exports.terms()
exports._prev_search_date  = new Date() // So it'll search the first time you press a key. A bit slow, but easy to code and nice feedback

exports.add_listener = function() {
  document.querySelector('#search > input[name="terms"]').addEventListener('keyup', function() {
    exports._prev_search_date = new Date()
    setTimeout(function() {
      var enough_time_passed = (new Date() - exports._prev_search_date) > 300
      var has_new_terms = exports._prev_search_terms !== exports.terms()
      if (enough_time_passed && has_new_terms && exports.terms() !== '') {
        exports.page = 1
        exports._prev_search_terms = exports.terms()

        exports.search()
      }
    }, 300)
  })
}

exports.main = function() {
  var path = window.location.hash.split('/')
  exports.add_listener()

  if (path.length === 3) {
    var search = path[1]
    var page = path[2]

    document.querySelector('#search > input[name="terms"]').value = decodeURIComponent(search)
    exports.page = (1 * page) || 1
    exports.search()
  } else {
    exports.page = 1
  }




  // Random placeholder
  var placeholders = [
     'arson, bus stops, campaigns, zoos, ...',
     'bus stops, restaurants, music, air quality' ,
     'farms, airports, hospitals, 311, ...', 
     'schools, sewers, shelters, spending, ...'
  ]
  var placeholder = placeholders[Math.floor(Math.random()*placeholders.length)]
  document.querySelector('input[name="terms"]').setAttribute('placeholder', placeholder)


}

window.openprism = exports
